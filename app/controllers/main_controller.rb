class MainController < ApplicationController

  def index
  end

  def stub
    data = Wordnik::Wordnik.get('http://beta.wordnik.com/api/corpus.json/contextualLookup')
    @wordstring = data['wordstring']
    @examples = data['examples']
  end

  def definitions
    @definitions = @word.definitions
  end

end
