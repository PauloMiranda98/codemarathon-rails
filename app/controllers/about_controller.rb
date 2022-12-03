# frozen_string_literal: true

class AboutController < ApplicationController
  before_action do
    config_current_nav(:about)
    config_head_title("Sobre - Code Marathon")
    config_head_description("Explicação sobre o site Code Marathon")
  end

  def index; end
end
