class AboutComponent < ViewComponent::Base
  def initialize( title:, image_url:)
    @title = title
    @image_url = image_url
  end
end
