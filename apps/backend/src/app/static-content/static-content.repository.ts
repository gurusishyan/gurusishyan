import { loggerInstance } from '@gurusishyan-logger';
import { StaticContent } from '../../entities/static-content/static-content.entity';
import { SharedService } from '../shared/shared.service';

export class StaticContentRepository {
  constructor() {}

  private commonService = new SharedService();

  getStaticContentForRoute = async (route_name: string, locale: string) =>
    await StaticContent.findOne({ route_name }, [
      'label' + '.' + locale,
      'placeholder' + '.' + locale,
      'button' + '.' + locale,
      'href' + '.' + locale,
    ])
      .then((data) =>
        data ? data : { error: true, message: 'May be route is wrong' }
      )
      .catch((err) => {
        loggerInstance.log(
          err.message | err,
          'error',
          'StaticContentRepository'
        );
        this.commonService.sendErrorMessage(err);
      });
}
