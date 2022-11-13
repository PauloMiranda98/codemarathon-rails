require 'rails_helper'

RSpec.describe "See home page", type: :request do
  describe "GET /" do
    it "It is possible to see the home page" do
      get "/"
      expect(response).to have_http_status(:success)
      
      expect(response.body).to include("Code Marathon")
      expect(response.body).to include("Quero Aprender")
      expect(response.body).to include("Quero Contribuir")
    end
  end
end
