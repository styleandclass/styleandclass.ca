# Filters taken from the Octopress project by Brandon Mathis.
# https://github.com/imathis/octopress/blob/master/plugins/octopress_filters.rb
module Jekyll

  module Filters

    # Replaces relative urls with full urls
    def expand_urls(input, url='')
      url ||= '/'
      input.gsub /(\s+(href|src)\s*=\s*["|']{1})(\/[^\"'>]*)/ do
        $1+url+$3
      end
    end

  end

end