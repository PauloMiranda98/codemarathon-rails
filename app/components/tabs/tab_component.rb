# frozen_string_literal: true

module Tabs
  class TabComponent < ViewComponent::Base
    attr_reader :title, :url, :is_active

    def initialize(title:, url:, is_active: false)
      @title = title
      @url = url
      @is_active = is_active
    end
  end
end
