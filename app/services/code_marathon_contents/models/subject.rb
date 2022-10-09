module CodeMarathonContents::Models
  class Subject
    attr_accessor :name, :slug, :category_slug, :difficulty, :obi_frequency, :icpc_frequency

    def initialize(model_hash)
      hash = model_hash.symbolize_keys

      @name = hash[:name]
      @slug = hash[:slug]
      @category_slug = hash[:category_slug]
      @difficulty = hash[:difficulty]
      @obi_frequency = hash[:obi_frequency]
      @icpc_frequency = hash[:icpc_frequency]
    end
  end
end