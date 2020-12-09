class ProjectsController < ApplicationController
    def index
        projects = Project.all
        render json: projects, except: [:created_at, :updated_at, :developer_id]
    end

    def show
        project = Project.find_by(id: params[:id])
        # if params[:started] == " "
        #     render json: { message: 'Start project' }
        #   end
    end

end
