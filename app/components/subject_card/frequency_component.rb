module SubjectCard
  class FrequencyComponent < ViewComponent::Base
    def initialize(id: SecureRandom.hex, title:, frequency:)
      @id = id 
      @title = title
      @frequency = frequency
    end
  end
end
