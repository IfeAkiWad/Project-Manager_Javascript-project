class ProjectsController < ApplicationController
  before_action :set_developer 
  before_action :set_project, only: [:show, :destroy]

  # GET /projects
  def index
    @projects = @developer.projects
    render json: @projects, except: [:created_at, :updated_at]
  end

  # GET /projects/1
  def show
    render json: @project, except: [:created_at, :updated_at]
  end
  
  # POST /project
  def create #FIXED - OBJECT NOT SAVING: project id is nil, and developer_id is nil
    @project = @developer.projects.new(project_params)
    if @project.save
      render json: @project, status: :created, location: @project
    else
      render json: @project.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @project.destroy
    render json: {message: "Successfully deleted #{@project.name}!"}
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_project
      @project = Project.find(params[:id])
    end

    def set_developer
      # @developer = Developer.find_by(params[:developer_id])
      @developer = Developer.find_by(params[:developer_id]) 
    end

    # Only allow a trusted parameter through.
    def project_params
      params.require(:project).permit(:name, :started, :deadline, :description, :developer_id)
    end

end
