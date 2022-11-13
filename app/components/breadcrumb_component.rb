# frozen_string_literal: true

class BreadcrumbComponent < ViewComponent::Base
  renders_many :items, Breadcrumb::ItemComponent
end
