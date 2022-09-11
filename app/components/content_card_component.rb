class ContentCardComponent < ViewComponent::Base
  def initialize(title:, image_url:, obi_frequency:, maratona_frequency:, link_url:)
    @title = title
    @image_url = image_url
    @obi_frequency = obi_frequency
    @maratona_frequency = maratona_frequency
    @link_url
  end
end
