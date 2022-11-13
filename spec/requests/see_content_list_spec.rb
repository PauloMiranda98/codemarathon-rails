# frozen_string_literal: true

require "rails_helper"

RSpec.describe "See content list", type: :request do
  describe "GET /conteudos" do
    it "Redirect to default category" do
      get "/conteudos"
      expect(response).to have_http_status(:redirect)
      expect(response).to redirect_to("/conteudos/introducao")
    end
  end

  describe "GET /conteudos/:id" do
    it "See a category" do
      get "/conteudos/introducao"
      expect(response).to have_http_status(:success)

      expect(response.body).to include("Introdução")
      expect(response.body).to include("Como Estudar para Maratona de Programação?")
      expect(response.body).to include("Frequência na OBI")
      expect(response.body).to include("Frequência na Maratona")
    end
  end
end
