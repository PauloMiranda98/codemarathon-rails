class NavbarComponent < ViewComponent::Base
  renders_one  :title
  renders_many :items, Navbar::NavItemComponent

  def initialize(user:)
    @user = user
  end
end
