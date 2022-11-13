# frozen_string_literal: true

class AboutController < ApplicationController
  before_action do
    config_current_nav(:about)
  end

  def index; end
end
