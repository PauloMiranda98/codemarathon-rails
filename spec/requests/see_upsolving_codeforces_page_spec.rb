# frozen_string_literal: true

require "rails_helper"

RSpec.describe "See upsolving codeforces page", type: :request do
  describe "GET /upsolving_codeforces" do
    it "The page load div to react js" do
      get "/upsolving_codeforces"
      expect(response).to have_http_status(:success)

      expect(response.body).to include("<div id=\"upsolving-codeforces-component\">")
    end
  end
end
