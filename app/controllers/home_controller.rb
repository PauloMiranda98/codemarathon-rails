# frozen_string_literal: true

class HomeController < ApplicationController
  before_action do
    config_current_nav(:home)
    config_head_title("Code Marathon")
    config_head_description("O Code Marathon é um site onde pessoas interessadas por Maratona de Programação e Olimpíada Brasileira de Informática podem aprender os conteúdos recorrentes nessas competições.")
  end

  def index; end
end
