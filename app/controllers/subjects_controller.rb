class SubjectsController < ApplicationController
  before_action do 
    @current_nav = :contents
  end

  def show
    @subject = Subject.find_by(slug: params[:id])
    redirect_to(root_path) && return if @subject.blank?

    @category = @subject.category
  end
end
