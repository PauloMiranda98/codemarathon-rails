# frozen_string_literal: true

class UpsolvingCodeforcesController < ApplicationController
  before_action do
    config_current_nav(:upsolving_codeforces)
    config_head_title("Upsolving Codeforces - Code Marathon")
    config_head_description("\"Upsolving Codeforces\" é uma ferramenta que permite avaliar seus últimos contents e verificar quais questões precisam de upsolving na plataforma Codeforces.")
  end

  def index; end
end
