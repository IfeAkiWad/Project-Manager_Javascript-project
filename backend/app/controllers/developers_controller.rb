class DevelopersController < ApplicationController
  before_action :set_developer, only: [:show] 

  # GET /developers
  def index
    
    @developers = Developer.all

    render json: @developers, except: [:created_at, :updated_at], include: [:projects]
  end

  # GET /developers/1
  def show
    render json: @developer, include: [:projects], except: [:created_at, :updated_at]
    byebug
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_developer
      @developer = Developer.find(params[:id])
      
    end

    # Only allow a trusted parameter through.
    def developer_params
      params.require(:developer).permit(:dev_name, projects_attribute: [:name, :started, :deadline, :description])
    end
end
