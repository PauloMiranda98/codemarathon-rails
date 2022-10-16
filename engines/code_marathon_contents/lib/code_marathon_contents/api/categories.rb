module CodeMarathonContents::Api
  class Categories
    def self.find_all
      index_text = Base.obtain_file_text(
        relative_path: "contents/index.json"
      )
      body = JSON.parse(index_text)

      body.map do |category|
        CodeMarathonContents::Models::Category.new(category)
      end
    end

    def self.find(slug:)
      categories = find_all

      categories.find { |category| category.slug == slug }
    end
  end
end