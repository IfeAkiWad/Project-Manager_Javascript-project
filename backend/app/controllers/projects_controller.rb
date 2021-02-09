class ProjectsController < ApplicationController
  before_action :set_developer 
   before_action :set_project, only: [:show, :update]

  # GET /projects
  def index
    # set_developer
    @projects = @developer.projects
    render json: @projects, except: [:created_at, :updated_at]
  end

  # GET /projects/1
  def show
    render json: @project,except: [:created_at, :updated_at]
  end

  def new
    @project = Project.new
  end
  # POST /project
  def create #FIXED - OBJECT NOT SAVING: project id is nil, and developer_id is nil
    # set_developer
    @project = @developer.projects.new(project_params)
    # project_completed
    if @project.save
      render json: @project, status: :created, location: @project
    else
      render json: @project.errors, status: :unprocessable_entity
    end
    binding.pry
  end

  # PATCH/PUT /projects/1
  def update
    @project = @developer.projects
    if @project.update(project_params)
      render json: @project
    else
      render json: @project.errors, status: :unprocessable_entity
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_project
      @project = Project.find(params[:id])
    end

    def set_developer
      @developer = Developer.find_by(params[:developer_id])
    end

    # Only allow a trusted parameter "white list" through.
    def project_params
      params.require(:project).permit(:name, :started, :deadline, :description, :completed, :developer_id)
    end

    def project_completed
      if params[:completed] == true
          return true
      else
          return false
      end
  end
end
