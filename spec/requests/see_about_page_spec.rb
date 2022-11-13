# frozen_string_literal: true

require "rails_helper"

RSpec.describe "See about page", type: :request do
  describe "GET /sobre" do
    it "It is possible to see the about page" do
      get "/sobre"
      expect(response).to have_http_status(:success)

      expect(response.body).to include("Code Marathon")
      expect(response.body).to include("OBI")
      expect(response.body).to include("Maratona de Programação")
    end
  end
end
