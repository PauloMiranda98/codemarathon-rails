module CodeMarathonContents::Api
  class Categories
    def self.find_all
      response = Faraday.get("#{CodeMarathonContents::Api::Base.host}/contents/index.json")
      body = JSON.parse(response.body)

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