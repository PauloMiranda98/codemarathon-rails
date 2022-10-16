module CodeMarathonContents::Models
  class Content
    attr_accessor :category_slug, :subject_slug, :text

    def initialize(category_slug:, subject_slug:, text:)
      @category_slug = category_slug
      @subject_slug = subject_slug
      @text = text
    end
  end
end