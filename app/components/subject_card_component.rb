class SubjectCardComponent < ViewComponent::Base
  def initialize(title:, image_url:, obi_frequency:, icpc_frequency:, link_url:)
    @title = title
    @image_url = image_url
    @obi_frequency = obi_frequency
    @icpc_frequency = icpc_frequency
    @link_url = link_url
  end
end
