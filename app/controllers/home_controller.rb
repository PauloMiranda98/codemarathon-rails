class HomeController < ApplicationController
  before_action do 
    @current_nav = :home
  end

  def index
  end
end
