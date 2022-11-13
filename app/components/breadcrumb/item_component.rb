# frozen_string_literal: true

module Breadcrumb
  class ItemComponent < ViewComponent::Base
    attr_reader :title, :url

    def initialize(title:, url: nil)
      @title = title
      @url = url
    end
  end
end
