FROM node:12.8.1

ENV NODE_ENV=production

RUN useradd -ms /bin/bash etherpad
RUN mkdir /opt/etherpad-lite && \
    chown etherpad:etherpad -R /opt/etherpad-lite

WORKDIR /opt/etherpad-lite
COPY --chown=etherpad:etherpad . .

USER etherpad:etherpad
RUN bin/installDeps.sh

# Install Plugins - it seems like we must do this _after_ installDeps
RUN npm install \
  ep_comments_page@0.0.35 \
  ep_disable_format_buttons@0.0.1 \
  ep_page_view@0.5.24 \
  ep_spellcheck@0.0.3 \
  ep_themes_ext@0.0.4

RUN npm install plugins_available/ep_healthcheck

ENTRYPOINT ["bin/preprocess.sh"]
CMD ["node", "node_modules/ep_etherpad-lite/node/server.js"]
