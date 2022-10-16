module CodeMarathonContents::Models
  class Category
    attr_accessor :name, :slug, :image, :subjects

    def initialize(model_hash)
      hash = model_hash.symbolize_keys

      @name = hash[:name]
      @slug = hash[:slug]
      @image = hash[:image]
      
      @subjects = hash[:subjects].map do |subject|
        CodeMarathonContents::Models::Subject.new(subject)
      end
    end
  end
end