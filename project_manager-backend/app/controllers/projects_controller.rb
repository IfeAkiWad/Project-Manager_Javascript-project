class ProjectsController < ApplicationController
    before_action :set_developer
    before_action :set_project, only: [:show, :edit, :update]
    
    def index
        projects = developer.projects
        render json: projects.to_json(except: [:created_at, :updated_at, :developer_id])
    end

    def create
        project = developer.projects.new(project_params) 
        project.developer = developer #do I even need this?
        project.save
        render_project

    def show
        # project = Project.find_by(id: params[:id])
        # if params[:started] == " "
        #     render json: { message: 'Start project' }
        #   end
        render_project
    end

    def edit
    end

    def update # how do I build this using json ???
        if project.update(project_params)
            render_project
        # else
            # ???
            # render edit
        end
    end

    private

    def render_project
        render json: project.to_json(except: [:created_at, :updated_at, :developer_id])
    end

    def set_developer
        developer = developer.find_by_id(params[:developer_id])
    end

    def set_project
        project = developer.projects.find_by_id(params[:id])
    end
    def project_params
        params.require(:project).permit(:name, :started, :deadline, :description, :completed)
    end

end
