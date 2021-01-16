class ProjectsController < ApplicationController
  before_action :set_project, only: [:show, :update]

  # GET /projects
  def index
    @projects = Project.all

    render json: @projects, except: [:created_at, :updated_at]
  end

  # GET /projects/1
  def show
    render json: @project,except: [:created_at, :updated_at]
  end

  # POST /projects
  def create
    @project = Project.new(project_params)

    if @project.save
      render json: @project, status: :created, location: @project
    else
      render json: @project.errors, status: :unprocessable_entity
    end
    # binding.pry
  end

  # PATCH/PUT /projects/1
  def update
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

    # Only allow a trusted parameter "white list" through.
    def project_params
      params.require(:project).permit(:name, :started, :deadline, :description, :completed, :developer_id)
    end
end
