# frozen_string_literal: true

module CodeMarathonContents::Api
  class Contents
    def self.find(category_slug:, subject_slug:)
      text_in_markdown = Base.obtain_file_text(
        relative_path: "contents/#{category_slug}/#{subject_slug}.md"
      )

      CodeMarathonContents::Models::Content.new(
        category_slug:,
        subject_slug:,
        text: text_in_markdown
      )
    end
  end
end
