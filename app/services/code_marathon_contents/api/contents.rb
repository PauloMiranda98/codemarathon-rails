module CodeMarathonContents::Api
  class Contents
    def self.find(category_slug:, subject_slug:)
      response = Faraday.get("#{CodeMarathonContents::Api::Base.host}/contents/#{category_slug}/#{subject_slug}.md")

      CodeMarathonContents::Models::Content.new(
        category_slug: category_slug,
        subject_slug: subject_slug,
        text: response.body
      )
    end
  end
end