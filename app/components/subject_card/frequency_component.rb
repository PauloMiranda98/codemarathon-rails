# frozen_string_literal: true

module SubjectCard
  class FrequencyComponent < ViewComponent::Base
    def initialize(title:, frequency:, id: SecureRandom.hex)
      @id = id
      @title = title
      @frequency = frequency
    end
  end
end
