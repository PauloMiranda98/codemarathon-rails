# frozen_string_literal: true

module Analytics
  class TrackGoogleAnalyticsComponent < ViewComponent::Base
    def initialize(google_analytics_id:)
      @google_analytics_id = google_analytics_id
    end

    def render?
      @google_analytics_id.present?
    end
  end
end
