FROM node:12.8.1

# Set the following to production to avoid installing devDeps
# this can be done with build args (and is mandatory to build ARM version)
ENV NODE_ENV=production

RUN useradd -ms /bin/bash etherpad
RUN mkdir /opt/etherpad-lite && \
    chown etherpad:etherpad -R /opt/etherpad-lite

WORKDIR /opt/etherpad-lite
COPY --chown=etherpad:etherpad . .

USER etherpad:etherpad
RUN bin/installDeps.sh

ENTRYPOINT ["bin/preprocess.sh"]
CMD ["node", "node_modules/ep_etherpad-lite/node/server.js"]
