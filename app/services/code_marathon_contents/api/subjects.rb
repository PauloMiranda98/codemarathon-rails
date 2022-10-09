module CodeMarathonContents::Api
  class Subjects
    def self.find(category_slug:, subject_slug:)
      category = CodeMarathonContents::Api::Categories.find(slug: category_slug)

      category.subjects.find { |subject| subject.slug == subject_slug }
    end
  end
end