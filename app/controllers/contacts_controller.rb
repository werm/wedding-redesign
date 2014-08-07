class ContactsController < ApplicationController
  def new
    @contact = Contact.new
  end

  def create
    @contact = Contact.new(contacts_params)
    @contact.request = request
    respond_to do |format|
      if @contact.deliver
        msg = { :status => "ok", :message => "success" }
        format.json  { render json: msg }
      else
        format.json { render json: @contact.errors, status: :unprocessable_entity }
      end
    end
  end

  def contacts_params
    params.require(:contact).permit(:name, :email, :message, :nickname)
  end

end