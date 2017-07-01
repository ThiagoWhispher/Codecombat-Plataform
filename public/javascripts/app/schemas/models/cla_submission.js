require.register("schemas/models/cla_submission", function(exports, require, module) {
var CLASubmissionSchema, c;

c = require('./../schemas');

CLASubmissionSchema = c.object({
  title: 'CLA Submission',
  description: 'Recording when a user signed the CLA.'
});

_.extend(CLASubmissionSchema.properties, {
  user: c.objectId({
    links: [
      {
        rel: 'extra',
        href: '/db/user/{($)}'
      }
    ]
  }),
  email: c.shortString({
    format: 'email'
  }),
  name: {
    type: 'string'
  },
  githubUsername: c.shortString(),
  created: c.date({
    title: 'Created',
    readOnly: true
  })
});

c.extendBasicProperties(CLASubmissionSchema, 'user.remark');

module.exports = CLASubmissionSchema;
});

;
//# sourceMappingURL=/javascripts/app/schemas/models/cla_submission.js.map