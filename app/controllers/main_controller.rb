class MainController < ApplicationController

  def index
  end

  def bookmarklet
    render(:template=>false)
  end

  def stub
    data = Wordnik::Wordnik.get('http://beta.wordnik.com/api/corpus.json/contextualLookup')
    @wordstring = data['wordstring']
    @examples = data['examples']
  end

  def definitions
    @definitions = @word.definitions unless @word.nil?
  end

end
