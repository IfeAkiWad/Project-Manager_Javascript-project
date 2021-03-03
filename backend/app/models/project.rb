class Project < ApplicationRecord
    belongs_to :developer

    # def project_completed
    #     if params[:completed] === true
    #         return true
    #     else
    #         return false
    #     end
    # end

    # if params[:started].blank?
    #     puts "Not yet started"
    # end
end
