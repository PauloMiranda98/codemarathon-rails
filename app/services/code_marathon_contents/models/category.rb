module CodeMarathonContents::Models
  class Category
    attr_accessor :name, :slug, :image, :subjects

    def initialize(model_hash)
      hash = model_hash.symbolize_keys

      @name = hash[:name]
      @slug = hash[:slug]
      @image = build_image_url(hash[:image])
      
      @subjects = hash[:subjects].map do |subject|
        CodeMarathonContents::Models::Subject.new(subject)
      end
    end

    private

    def build_image_url(relative_path)
      "http://localhost#{relative_path}"
    end
  end
end