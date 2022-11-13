require 'rails_helper'

RSpec.describe "See example subject", type: :request do
  describe "GET /conteudos/:category_id/:id" do
    it "See example subject" do
      get "/conteudos/introducao/como-estudar-para-maratona-de-programacao"
      expect(response).to have_http_status(:success)

      expect(response.body).to include("Início")
      expect(response.body).to include("Introdução")
      expect(response.body).to include("Como Estudar para Maratona de Programação?")
      expect(response.body).to include("Onde Aprender Conteúdos Novos?")
    end
  end
end
