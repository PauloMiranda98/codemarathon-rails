class HomeController < ApplicationController
  include WithNavbar
  before_action -> { set_navbar(:home) }

  def index
  end
end
