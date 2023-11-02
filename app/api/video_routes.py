from flask import Blueprint
from flask_login import login_required, current_user
from app.models import Video, db
from app.forms import VideoForm
from .auth_routes import validation_errors_to_error_messages
from flask import request

video_routes = Blueprint('videos', __name__)

# PUT /videos/:videoId
@video_routes.route('/<int:videoId>', methods=['PUT'])
@login_required
def update_video(videoId):
  """
  Updates a video's url
  """
  video = Video.query.get(videoId)
  if not video:
    return { 'error': 'Video not found' }, 404
  if current_user.id != video.get_pageOwnerId():
    return { 'Unauthorized': 'User does not have permission to update this video' }, 401
  form = VideoForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    video.name = form.data['name']
    video.video = form.data['video']
    db.session.commit()
    return video.to_dict()
  else:
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400

# DELETE /videos/:videoId
@video_routes.route('/<int:videoId>', methods=['DELETE'])
@login_required
def delete_video(videoId):
  video = Video.query.get(videoId)
  if not video:
    return { 'error': 'Video not found' }, 404
  if current_user.id != video.get_pageOwnerId():
    return { 'Unauthorized': 'User does not have permission to delete this video' }, 401
  db.session.delete(video)
  db.session.commit()
  return { 'message': 'Video deleted' }
