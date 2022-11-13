# frozen_string_literal: true

class TabsComponent < ViewComponent::Base
  renders_many :tabs, Tabs::TabComponent
  renders_one :body
end
