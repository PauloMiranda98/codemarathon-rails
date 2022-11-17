# frozen_string_literal: true

class ApplicationController < ActionController::Base
  private
    def config_current_nav(current)
      @current_nav = current
    end

    def not_found(message = "Not Found")
      raise ActionController::RoutingError.new(message)
    end
end
