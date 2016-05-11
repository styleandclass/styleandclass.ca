# STYLE & CLASS WEBSITE

This is the website for the Style & Class event series, powered by Jekyll.

## SETUP

To start contributing changes, clone this repo into a new folder and then on
the command line:

* Install Jekyll if necessary (instructions at http://jekyllrb.com/)
* Install Grunt if necessary (instructions at http://gruntjs.com/)
* Navigate to the repo and install dependencies with ``npm install``
* Install this gem dependency: ``gem install jekyll-sitemap`` (TODO: Gemfile)
* Go to the `root` directory
* Run Jekyll server with ``jekyll serve``
* Make your changes and test them locally
* Before sending up your changes, run all grunt tasks (CSS prefixing,
  minification) with ``grunt``
* Push your changes to Github and issue a pull request

## MAKING CHANGES

Once you've committed your changes and pushed them to Github, please issue a
Pull Request. We'll merge and deploy once we've had a chance to review.

### DEPLOYING

S&C Organizers can deploy themselves using `grunt deploy`.

Organizers may add additional organisers by running the following command:

```sh
npm install -g surge
surge ./_site styleandclass.ca --add example@mobify.com
```

…where `example@mobify.com` is replaced with the new organizer’s email address. This will re-deploy the site and send an an email giving the new organizer permission to deploy the project too.

## ADDING A PAGE

Adding pages is pretty simple. If the page is for an event, speaker or
venue, skip this part and read the extra info below about those content types.

* Choose where you want the page to live in the URL structure
* Create a folder, and add an index.html or index.md file -- you can use
  either HTML or Markdown to build your page, see ``/about/organizers/index.html``
  and ``/about/vision/index.md`` for examples of each, including required metadata.
* Within the metadata, choose a layout (all layouts exist in ``/_layouts/``) and
  title your page. Use this syntax at the top:

        ---
        layout: page
        title: This Page's Title
        ---

* If your page needs to exist within the main navigation, add it to
  ``/_data/menu.yaml``

Alternatively, just clone an existing page and update the metadata.


## HOW CONTENT OBJECTS WORK

Our Event, Speaker, Talk, Sponsor and Venue data lives in JSON files within the
``/_data`` folder.

We've set up our content structures to be as modular as possible. Since Jekyll
offers neither full blown CMS nor relational database, we're jumping through a
few hoops to piece everything together. (It's entirely possible Jekyll was the
wrong choice for this site, but, here we are.)

Each JSON data file contains an array of objects of a particular type. In order
to link an object to a different data type -- ie. linking a talk to an event --
we need a linking key that's identical between both objects.

In most cases, this will be a key called ``name`` or ``title``. So for example, in
our ``events.json`` file we have attached talks to each event via the ``talks``
object. Each item in this object references a specific talk by the ``title`` key,
which we would then lookup against ``talks.json``.

Each of these keys must be unique, and in order to properly link objects they
must be identical between files. Here's how these keys map out between files:

    events.talks.title == talks.title
    events.sponsors.sponsor == sponsors.name
    events.venue == venues.name
    talks.speaker == people.name


## ADDING A SPEAKER, TALK, VENUE OR SPONSOR

None of these content types have their own individual pages, so you simply need
to add a new entry to the respective ``/_data`` file.

For example, to add a new speaker:

* Open ``/_data/people.json`` and append a clone of an existing person object at the
  end.
* Update details of the new person.
* If necessary, update ``talks.json`` speaker names to precisely match the name of
  this new person.
* Ensure that your JSON is valid.

We have listing pages for speakers and sponsors that you can visit to
confirm that your new addition is showing up properly. Visit ``/speakers/`` or
``/about/sponsors/`` in your browser.

Special note on speakers: since Jekyll doesn't provide the ability to sort data
collections by a child key, we're hacking alphabetical order of speaker names by
just doing it manually in the JSON file. If you add a new speaker, make sure to
add them in the right alphabetical place in the file, by last name.


## ADDING AN EVENT

* Open ``/_data/events.json`` and append a clone of an existing event at the
  beginning.
* Update the event details to the new event.
* Ensure that venue, sponsor and talk names precisely match existing values in
  their respective data files. You'll likely need to create one or more of
  these, see that section below for details.
* Ensure that your JSON is valid.

Our content objects cause a bit of redundancy when creating events. Here's the
part that's annoying and should be automated, but isn't:

* You'll also have to create a new folder for the event. It should live under
  ``/events/YEAR/`` and should precisely match the ``url-site`` value you chose in
  ``events.json``
* Clone an existing event's ``index.html`` into that folder
* Update title and permalink in the new ``index.html`` file. Ensure they precisely
  match the values you chose in ``events.json``


## TROUBLESHOOTING

Sometimes you'll find that events, people, talks, or venues don't show up as
intended. To debug, you'll need to be familiar with how content objects work;
make sure to read that section above.

### MISSING CONTENT

The most common cause of missing content is non-identical linking keys. This can
spill out to unexpected places; for example, misspelling a person's name in
``talks.json`` will prevent that talk from even showing up on an event page's talk
listing.

When you encounter missing content, check all linking keys between any of the
possible content types. Copy and paste values to ensure they're identical.


### DUPLICATE CONTENT

If you're adding a second occurance of a content object (e.g. a talk) you may
find the site duplicates the talk listing if the title is identical. This is a
side effect of the way we're looping through each data file, and can easily be
side-stepped by either ensuring there's only a single instance of a talk in
``talks.json``.

You may want a second listing anyway to update certain details about the talk;
in that case, just make sure the titles are somehow different from each other --
changing the case of a single character is a quick hack to accomplish that.


### SPEAKERS AREN'T ALPHABETIZED

We're doing this manually; see the special note under the Adding Speakers
section above.


### JEKYLL IS THROWING LIQUID ERRORS

If you see something like the following:

    Liquid Exception: Included file '_includes/partial-event-large.html' not found

The most likely culprit is that you ran ``jekyll serve`` in `./`, when you need to run it in `./root/`
