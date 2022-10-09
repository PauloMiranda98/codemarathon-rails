class AboutController < ApplicationController
  before_action do 
    @current_nav = :about
  end

  def index
  end
end
