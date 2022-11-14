# frozen_string_literal: true

require "rails_helper"

RSpec.describe "See subjects", type: :request do
  describe "GET /conteudos/:category_id/:id" do
    it "See example subject" do
      get "/conteudos/introducao/como-estudar-para-maratona-de-programacao"
      expect(response).to have_http_status(:success)

      expect(response.body).to include("Início")
      expect(response.body).to include("Introdução")
      expect(response.body).to include("Como Estudar para Maratona de Programação?")
      expect(response.body).to include("Onde Aprender Conteúdos Novos?")
    end

    describe "See all subjects" do
      categories = CodeMarathonContents::Api::Categories.find_all

      categories.each do |category|
        category.subjects.each do |subject|
          it "It is possible to see '#{category.name} - #{subject.name}' subject" do
            get "/conteudos/#{category.slug}/#{subject.slug}"
            expect(response).to have_http_status(:success)
          end
        end
      end
    end
  end
end
