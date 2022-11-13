# frozen_string_literal: true

class HomeController < ApplicationController
  before_action do
    config_current_nav(:home)
  end

  def index; end
end
